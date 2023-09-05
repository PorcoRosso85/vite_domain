import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const graphData = {
  nodes: [
    { id: 'node1', label: 'Node 1' },
    { id: 'node2', label: 'Node 2' },
    { id: 'node3', label: 'Node 3' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node2', target: 'node3' },
  ],
};

const routings = {
  graphData: publicProcedure.query(async () => {
    return graphData;
  }),
};

const appRouter = router(routings);
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);

if (import.meta.vitest) {
  describe('TRPC Server Initialization', () => {
    it('should initialize TRPC correctly', () => {
      const t = initTRPC.create();
      expect(t).toBeDefined();
      // FIXME
      // expect(typeof t.procedure).toBe('function');
      expect(typeof t.router).toBe('function');
    });
  });

  describe('Graph Data', () => {
    it('should have correct initial graphData', () => {
      expect(graphData.nodes).toEqual([
        { id: 'node1', label: 'Node 1' },
        { id: 'node2', label: 'Node 2' },
        { id: 'node3', label: 'Node 3' },
      ]);

      expect(graphData.edges).toEqual([
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
      ]);
    });
  });
  // describe('Public Procedures', () => {
  //   it('should expose publicProcedure for queries', async () => {
  //     const caller = appRouter.createCaller({});
  //     const result = await caller.query('graphData');
  //     expect(result).toEqual(graphData);
  //   });
  // });

  describe('Router Initialization', () => {
    it('should initialize router with correct routings', () => {
      const testRouter = router({
        graphData: publicProcedure.query(async () => {
          return graphData;
        }),
      });
      // ルータが正確に設定されたかどうかをテストするためのロジック
    });
  });
}
