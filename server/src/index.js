import { server } from './server';

server.listen(4000, process.env.HOST).then(({ url }) => {
  consola.ready({
    message: `🚀 Server ready at ${url}`,
    badge: true,
  });
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
