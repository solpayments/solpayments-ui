import { PublicKey } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import type { Result } from '../helpers/result';
import { failure, success } from '../helpers/result';
import { getUiAmount } from '../helpers/utils';
import { CONFIRMED } from '../helpers/constants';
import { MERCHANT_ACC_OWNER_FIELD_OFFSET, SOL_DECIMALS } from './constants';
import { MERCHANT_LAYOUT } from './layout';
import type { Merchant } from './layout';

interface Base {
  connection: Connection;
}

interface GetMerchantAccountParams extends Base {
  ownerKey: PublicKey;
  programId: string;
}

/** Gets merchant accounts */
export const getMerchantAccounts = async (
  params: GetMerchantAccountParams
): Promise<Result<Merchant[] | null>> => {
  const { connection, ownerKey, programId } = params;
  const programIdKey = new PublicKey(programId);

  try {
    const result = await connection.getProgramAccounts(programIdKey, {
      commitment: CONFIRMED,
      filters: [
        { memcmp: { offset: MERCHANT_ACC_OWNER_FIELD_OFFSET, bytes: ownerKey.toBase58() } },
      ],
    });
    if (result.length < 1) {
      return success(null);
    }
    return success(
      result.map((item) => {
        const merchantData = MERCHANT_LAYOUT.decode(item.account.data);
        return {
          address: result[0].pubkey,
          account: {
            ...merchantData,
            fee: getUiAmount(merchantData.fee, SOL_DECIMALS),
          },
        };
      })
    );
  } catch (error) {
    return failure(error);
  }
};
