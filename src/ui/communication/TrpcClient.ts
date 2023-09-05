import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'infrastructure/communication/TrpcServer';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
    }),
  ],
});

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  describe('trpc機能チェック', () => {
    it('trpc.graphData出力', async () => {
      console.log(`tprc.graphData: ${await trpc.graphData.query()}`);
    });
  });
}
