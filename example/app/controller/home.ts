import { Controller } from "egg";

export default class HomeController extends Controller {
    /**
     * @swagger
     * /:
     *  get:
     *    description: index
     *    responses:
     *      200:
     *        content:
     *          text/html:
     *            schema:
     *              type: string
     */
    async index() {
        this.ctx.body = 'hi, ' + this.app.plugins.swagger.name;
    }
}
