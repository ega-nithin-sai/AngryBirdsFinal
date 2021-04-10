class Slingshot{
    constructor(body1,point2){
        var options = {
            bodyA: body1,
            pointB: point2,
            length: 10,
            stiffness: 0.02,
            damping: 0.02
        }
        this.pointB = point2;
        this.slingshot = Constraint.create(options);
        World.add(world,this.slingshot);
        this.sling1 = loadImage("sprites/sling1.png");
        this.sling2 = loadImage("sprites/sling2.png");
        this.sling3  =loadImage("sprites/sling3.png");
    }
    display(){
        if(this.slingshot.bodyA){
            var pos1 = this.slingshot.bodyA.position;
            var pos2 = this.pointB;

            push();
            stroke("#3F220E");
            strokeWeight(8);
            line(pos1.x-25,pos1.y,pos2.x-10,pos2.y);
            line(pos1.x+25,pos1.y,pos2.x+25,pos2.y+10);
            if(pos1.x < 170){
                image(this.sling3,pos1.x-25,pos1.y - 8,15,25);
            }
            else{
                image(this.sling3,pos1.x+15,pos1.y - 8,15,25);
            }
            pop();
        }

        image(this.sling1,160,55);
        image(this.sling2,130,53);
    }
    fly(){
        this.slingshot.bodyA = null;
    }
    attach(body){
        Body.setPosition(body,{x:160,y:80});
        this.slingshot.bodyA = body;
    }
}