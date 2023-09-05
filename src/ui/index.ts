if (typeof window !== 'undefined') {
  import('./graph').then(({ SimpleGraph, graphConfig, graphData }) => {
    console.log('imported graph modules');

    const executeGraphCode = () => {
      console.log('dom content loaded');
      const container = document.getElementById('graph-container');
      if (container instanceof HTMLElement) {
        const graph = new SimpleGraph(graphData, graphConfig(container));
        // const graph = new SimpleGraph(graphData, container, graphConfig);
      } else {
        console.error(`provided container is not a valid`);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', executeGraphCode);
    } else {
      executeGraphCode();
    }
  });
}
