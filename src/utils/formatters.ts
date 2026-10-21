/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Format currency in Indian Rupee format or standard locale
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format duration minutes into a clean readable string
 */
export function formatDuration(minutes?: number): string | null {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} mins`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
  return `${hours}h ${remainingMinutes}m`;
}
