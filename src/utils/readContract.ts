import { Address, BigDecimal, log } from "@graphprotocol/graph-ts"
import { NewOrder } from "../../generated/NewOrder/NewOrder"
import { JLP } from "../../generated/NewOrder/JLP"

// TODO: Figure out cleaner way to handle these helper methods
// For example, maybe we can somehow make just one method for balanceOf that is contract agnostic
export function tryNEWOBalanceOf(contract: NewOrder, address: Address): BigDecimal {
  let balanceOf = BigDecimal.zero()
  let tryBalanceOf = contract.try_balanceOf(address)
  if (!tryBalanceOf.reverted) {
    balanceOf = tryBalanceOf.value.toBigDecimal()
  } else {
    log.info("NEWO balanceOf reverted", [])
  }
  return balanceOf
}

export function tryNEWOTotalSupply(contract: NewOrder): BigDecimal {
  let totalSupply = BigDecimal.zero()
  let tryTotalSupply = contract.try_totalSupply()
  if (!tryTotalSupply.reverted) {
    totalSupply = tryTotalSupply.value.toBigDecimal()
  } else {
    log.info("NEWO totalSupply reverted", [])
  }
  return totalSupply
}

export function tryJLPBalanceOf(contract: JLP, address: Address): BigDecimal {
  let balanceOf = BigDecimal.zero()
  let tryBalanceOf = contract.try_balanceOf(address)
  if (!tryBalanceOf.reverted) {
    balanceOf = tryBalanceOf.value.toBigDecimal()
  } else {
    log.info("JLP balanceOf reverted", [])
  }
  return balanceOf
}

export function tryJLPTotalSupply(contract: JLP): BigDecimal {
  let totalSupply = BigDecimal.zero()
  let tryTotalSupply = contract.try_totalSupply()
  if (!tryTotalSupply.reverted) {
    totalSupply = tryTotalSupply.value.toBigDecimal()
  } else {
    log.info("JLP totalSupply reverted", [])
  }
  return totalSupply
}
