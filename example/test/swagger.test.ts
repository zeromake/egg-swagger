import { app } from "egg-mock/bootstrap";

describe("test/swagger.test.js", () => {
    // let app;
    // before(() => {
    //     app = mock.app({
    //         baseDir: "apps/swagger-test",
    //     });
    //     return app.ready();
    // });

    // after(() => app.close());
    // afterEach(mock.restore);

    it("should GET /", () => {
        return app
            .httpRequest()
            .get("/")
            .expect("hi, swagger")
            .expect(200);
    });
    it("should GET /swagger.json", () => {
        return app
            .httpRequest()
            .get("/swagger.json")
            .expect(200);
    });
});
