declare const _default: {
    path: string;
    name: string;
    hidden: boolean;
    component: () => Promise<typeof import("*.vue")>;
    meta: {
        requireAuth: boolean;
        showBackground: boolean;
    };
}[];
export default _default;
