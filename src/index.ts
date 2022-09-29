import * as PIXI from "pixi.js";
import { Spine } from "./pixi-spine";

const app = new PIXI.Application();
document.getElementById("app").appendChild(app.view);

app.stage.interactive = true;

function onAssetsLoaded(loader: PIXI.Loader, res: any) {
  // create a spine boy
  const spineBoyPro = new Spine(res.spineboypro.spineData);

  // set the position
  spineBoyPro.x = app.screen.width / 2;
  spineBoyPro.y = app.screen.height / 2;

  spineBoyPro.scale.set(0.4);

  app.stage.addChild(spineBoyPro);

  const singleAnimations = ["star1_Touch", "star2_Touch"];
  const loopAnimations = ["star1", "star2"];
  const allAnimations: Array<string> = ([] as Array<string>).concat(
    singleAnimations,
    loopAnimations
  );

  let lastAnimation = "";

  // Press the screen to play a random animation
  app.stage.on("pointerdown", () => {
    let animation = "";
    do {
      animation =
        allAnimations[Math.floor(Math.random() * allAnimations.length)];
    } while (animation === lastAnimation);

    spineBoyPro.state.setAnimation(
      0,
      animation,
      loopAnimations.indexOf(animation) >= 0
    );

    lastAnimation = animation;
  });
}

// load spine data
app.loader
  .add("spineboypro", "assets/skeleton.json", {
    crossOrigin: "*"
  })
  .load(onAssetsLoaded);
