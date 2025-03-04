import { Address } from '@ton/ton';

export function isTonAddress(value: any): boolean {
  try {
    const isAddress = Address.isFriendly(value);
    return isAddress;
  } catch {
    return false;
  }
}
