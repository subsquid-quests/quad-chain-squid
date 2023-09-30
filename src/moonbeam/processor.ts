import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc20abi from '../abi/erc20'

export const MOONBEAM_USDC_ADDRESS = '0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9'.toLowerCase()

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: 'http://localhost:8000/network/moonbeam-mainnet',
        // Disabled for quests to avoid DDoSing Ankr :)
        //chain: 'https://moonbeam-rpc.dwellir.com',
    })
    .setFinalityConfirmation(25)
    .setFields({
        log: {
            transactionHash: true
        }
    })
    .setBlockRange({
        from: 3_000_000
    })
    .addLog({
        address: [MOONBEAM_USDC_ADDRESS],
        topic0: [erc20abi.events.Transfer.topic]
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
