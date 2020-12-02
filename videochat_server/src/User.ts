export default class User{
    private userId: string;
    private userName: string;

    constructor(userId: string, userName:string){
        this.userId = userId;
        this.userName = userName;
    }

    public getUserId(): string{
        return this.userId;
    }

    public getUserName(): string{
        return this.userName;
    }
}