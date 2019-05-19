'use strict';

export default app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
};
