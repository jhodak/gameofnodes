import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useFetcher } from "@remix-run/react"
import { Group, Text, Card, Title, Grid } from "@mantine/core"
import { useEffect, useState } from "react"
import { getKlever } from "~/models/validator.server"
import {
  determineColor,
  determineColorPeerType,
  determineColorPercent,
  kleverOrder,
} from "~/utils/utilities"
import { KleverNodeCard } from "~/components/molecules/KleverNodeCard"

export const meta: MetaFunction = () => {
  return {
    title: "Node List - Game of Nodes",
  }
}

export const links = () => {
  //return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async () => {
  let data = getKlever()
  return data
}

export default function NodesPage() {
  let loaderData = useLoaderData()
  const [data, setData] = useState(loaderData)
  const fetcher = useFetcher()

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/nodes?index")
      }
    }, 3 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data)
    }
  }, [fetcher.data])

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

  return (
    <section className="NodeList">
      <Title order={1} align="center">
        Validators and Nodes
      </Title>
      <Grid justify="center" grow>
        {data &&
          data.map((item: any) => {
            if (item.chain === "Klever") {
              return (
                <Grid.Col
                  span={4}
                  key={item.name}
                  order={kleverOrder(item.name)}
                >
                  <KleverNodeCard
                    metrics={item.data.metrics}
                    name={item.name}
                    key={item.name}
                  />
                </Grid.Col>
              )
            }
          })}
      </Grid>
    </section>
  )
}
