import { Card, Title } from "@mantine/core"
import {
  determineColor,
  determineColorPeerType,
  determineColorPercent,
} from "~/utils/utilities"
import {
  CardGroupLayout,
  LayoutData,
  links as cardGroupLinks,
} from "../CardGroupLayout"
import styles from "./styles.css"

export const links = () => {
  return [...cardGroupLinks(), { rel: "stylesheet", href: styles }]
}

export type KleverListData = {
  name: string
  chain: "Klever"
  data: KleverData
}

type KleverData = {
  name: string
  metrics: {
    klv_app_version: string
    klv_average_block_tx_count: string
    klv_body_blocks_size: number
    klv_chain_id: string
    klv_connected_nodes: number
    klv_consensus_group_size: number
    klv_consensus_processed_proposed_block: number
    klv_consensus_received_proposed_block: number
    klv_consensus_slot_state: string
    klv_consensus_state: string
    klv_count_accepted_blocks: number
    klv_count_consensus: number
    klv_count_consensus_accepted_blocks: number
    klv_count_leader: number
    klv_cpu_load_percent: number
    klv_current_block_hash: string
    klv_current_header_block_size: number
    klv_current_slot: number
    klv_current_slot_timestamp: number
    klv_dev_rewards: string
    klv_epoch_for_economics_data: number
    klv_epoch_number: number
    klv_highest_final_nonce: number
    klv_inflation: string
    klv_is_syncing: number
    klv_last_block_tx_count: number
    klv_latest_tag_software_version: string
    klv_live_validator_nodes: number
    klv_mem_heap_inuse: number
    klv_mem_load_percent: number
    klv_mem_stack_inuse: number
    klv_mem_total: number
    klv_mem_used_golang: number
    klv_mem_used_sys: number
    klv_min_transaction_version: number
    klv_network_recv_bps: number
    klv_network_recv_bps_peak: number
    klv_network_recv_bytes_in_epoch_per_host: number
    klv_network_recv_percent: number
    klv_network_sent_bps: number
    klv_network_sent_bps_peak: number
    klv_network_sent_bytes_in_epoch_per_host: number
    klv_network_sent_percent: number
    klv_node_display_name: string
    klv_node_type: string
    klv_nonce: number
    klv_nonce_at_epoch_start: number
    klv_nonce_for_tps: number
    klv_nonces_passed_in_current_epoch: number
    klv_num_connected_peers: number
    klv_num_connected_peers_classification: string
    klv_num_nodes: number
    klv_num_shard_headers_processed: number
    klv_num_transactions_processed: number
    klv_num_transactions_processed_tps_benchmark: number
    klv_num_tx_block: number
    klv_num_validators: number
    klv_peak_tps: number
    klv_peer_type: string
    klv_probable_highest_nonce: number
    klv_public_key_block_sign: string
    klv_slot_at_epoch_start: number
    klv_slot_duration: number
    klv_slot_time: number
    klv_slots_passed_in_current_epoch: number
    klv_slots_per_epoch: number
    klv_start_time: number
    klv_synchronized_slot: number
    klv_total_fees: string
    klv_total_supply: string
    klv_tx_pool_load: number
  }
}

export const KleverNodeCard = (data: KleverData) => {
  const NodeData = data.metrics
  const layout = [
    {
      text: "Node Status :",
      value: NodeData.klv_peer_type,
      color: determineColorPeerType(NodeData.klv_peer_type),
    },
    {
      text: "Synchronization :",
      value:
        NodeData.klv_current_slot - NodeData.klv_synchronized_slot < 1
          ? "Synchronized"
          : `${
              NodeData.klv_current_slot - NodeData.klv_synchronized_slot
            } Blocks behind`,
      color: determineColor(
        NodeData.klv_current_slot - NodeData.klv_synchronized_slot
      ),
    },
    {
      text: "Blocks Minted :",
      value: NodeData.klv_count_leader,
    },
    {
      text: "Memory % :",
      value: +NodeData.klv_mem_load_percent,
      color: determineColorPercent(+NodeData.klv_mem_load_percent),
    },
    {
      text: "Processor % :",
      value: +NodeData.klv_cpu_load_percent,
      color: determineColorPercent(+NodeData.klv_cpu_load_percent),
    },
  ]
  return (
    <Card className="kleverNodeCard">
      <Title order={3} align="center">
        {data.name}
      </Title>
      {layout.map((item: LayoutData) => {
        return (
          <CardGroupLayout
            key={item.text}
            text={item.text}
            url={item.url}
            value={item.value}
            color={item.color}
          />
        )
      })}
    </Card>
  )
}
