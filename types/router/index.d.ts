import VueRouter from 'vue-router';
declare global {
    interface Window {
        $wujie?: {
            props: {
                jump: (options: {
                    path: string;
                }) => void;
            };
        };
    }
}
declare const router: VueRouter;
export default router;
