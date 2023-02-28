import * as Koa from 'koa';
import * as Router from 'koa-router';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';
const app = new Koa();
const router = new Router();

const context = new TuyaContext({
  baseUrl: 'https://openapi.tuyacn.com',
  accessKey: "1",
  secretKey: "1",
});

const main = async () => {
 //定义设备id
  const device_id = "6c61fcf54cefbdbc5akbez";
//下发指令
  const commands = await context.request({
    path: `/v1.1/iot-03/devices/${device_id}`,
    method: 'GET',
    // body: {
    //   "commands":[{"code":"switch_led","value":true}]
    // }
  });
  if(!commands.success) {
    new Error();
  }
  console.log("执行结果:",commands);
  return commands;
};
router.get('/cc', async (ctx) => {
  const res = await main();
    ctx.body = res;
});

app.use(router.routes());

app.listen(3001);

console.log('Server running on port 3001');