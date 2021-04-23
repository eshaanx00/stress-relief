let engine = Matter.Engine.create();
let Body = Matter.Bodies
let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width: window.innerWidth ,
        height: window.innerHeight 
    }
});

function changeNoOfStackes() {
    var x = document.getElementById("myText").value
    makeStakes(x,false);
}

function makeStakes(stakes) {
    let stack = Matter.Composites.stack(window.innerWidth/2-100, 100, stakes, stakes, 0, 0, function (x, y) {
        return Matter.Bodies.rectangle(x,y,30,30)
    });
Matter.World.add(engine.world,stack)
}

function remove(){
    Matter.Composite.clear(engine.world,false)
    addGround();
    makeMouse();
}

function addGround(){
    let ground = Matter.Bodies.rectangle(window.innerWidth/2, window.innerHeight-80, window.innerWidth, 60, {
        isStatic: true
    });
    Matter.Composite.add(engine.world,ground)
}



//mouse constraint
function makeMouse(){
    let mouse = Matter.Mouse.create(render.canvas)

    let mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: {
                visible: false
            }
        }
    });
    
    //rendering
    render.mouse = mouse;

    Matter.World.add(engine.world, [mouseConstraint]);
}

//Matter rendering

Matter.World.add(engine.world,[]);
Matter.Engine.run(engine);
Matter.Render.run(render);