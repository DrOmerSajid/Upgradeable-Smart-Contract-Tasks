// scripts/2.upgradeV2.ts
import { ethers } from "hardhat";
import { upgrades } from "hardhat";

const proxyAddress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'

async function main() {
  console.log(proxyAddress," original Box(proxy) address")
  const BoxV2 = await ethers.getContractFactory("BoxV2")
  console.log("upgrade to BoxV2...")
  const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2)
  console.log(boxV2.address," BoxV2 address(should be the same)")

  console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(boxV2.address), " getAdminAddress")    
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

// 0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0  BoxV2 address(should be the same)
// 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9  getImplementationAddress
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  getAdminAddress