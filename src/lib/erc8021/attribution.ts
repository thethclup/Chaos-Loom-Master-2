export const CODE = "bc_32zkkpq2";

export function getAttributionCode() {
  return "ATTRIBUTION_CODE_" + Date.now();
}

export function logTransactionAttribution(txHash: string) {
  console.log(`[ERC-8021] Transaction ${txHash} attributed to builder ${CODE}`);
}
