import { Bytes, BigDecimal, ethereum } from "@graphprotocol/graph-ts"
import {
  NewOrder,
  Approval,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer
} from "../generated/NewOrder/NewOrder"
import { NEWO_TOKEN_ADDRESS, JOE_REWARDS_VAULT } from "./utils/addresses"
import { SystemState } from "../generated/schema"
import { tryNEWOBalanceOf, tryNEWOTotalSupply } from "./utils/readContract"

export function handleApproval(event: Approval): void {
  updateSystemState(event)
}
export function handleTransfer(event: Transfer): void {
  updateSystemState(event)
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

// Call this periodically to update system state
function updateSystemState(event: ethereum.Event): void {
  //Load SystemState, or instantiate for the first time
  let systemState = SystemState.load("0")

  if (!systemState) {
    systemState = new SystemState("0")
    systemState.coinAddress = Bytes.fromByteArray(NEWO_TOKEN_ADDRESS)
    systemState.circulatingSupply = BigDecimal.zero()
  }

  // Update values that change, for now just circulating supply
  systemState.circulatingSupply = determineCirculatingSupply()
  systemState.save()
}

// Computes circulating supply by subtracting locked tokens from total supply
function determineCirculatingSupply(): BigDecimal {
  let contract = NewOrder.bind(NEWO_TOKEN_ADDRESS)

  // Total NEWO token supply
  let totalSupply = tryNEWOTotalSupply(contract)

  // Locked tokens in Joe LP Vault
  let lockedRewardsSupply = tryNEWOBalanceOf(contract, JOE_REWARDS_VAULT)

  let circulatingSupply = totalSupply
    .minus(lockedRewardsSupply)
    .div(BigDecimal.fromString("1000000000000000000"))

  return circulatingSupply
}
