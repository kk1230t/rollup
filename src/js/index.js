import UIkit from './api/index';
import Core from './core/core';
import boot from './api/boot';

// core functionality
// UIkit.use(Core);

boot(UIkit);
UIkit.use(Core);

export default UIkit;
