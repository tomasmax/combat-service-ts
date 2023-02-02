import App from '@/app';
import IndexRoute from '@routes/index.route';
import TargetsRoute from '@routes/targets.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new TargetsRoute()]);

app.listen();
