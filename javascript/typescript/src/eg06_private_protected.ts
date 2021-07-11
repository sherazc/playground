/*
Private and Protected transpiler errors are only limited
to Typescript file. Because in the transpiled .js file private,
and protected are created just like public.
*/
class Eg06Class {
    private myPrivate: string = "Private";
    protected myProtected: string = "Protected";
    public myPublic: string = "Public";
    myFriendly: string = "Friendly";
}