import { router } from "./context";
import { trpcUrlRouter } from "./url";

export const trpcRouter = router({
    url: trpcUrlRouter,
})