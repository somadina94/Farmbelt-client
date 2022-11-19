import classes from "./Home.module.css";
import chickens from "../../images/chickenss.jpg";
import layers from "../../images/layers.jpg";
import turkeys from "../../images/turkey.jpg";
import palmTrees from "../../images/palmTrees.JPG";
import palmTreez from "../../images/palmTreez.JPG";
import palmFruit from "../../images/palmfruit.jpg";
import papaya from "../../images/papaya.JPG";
import egg from "../../images/eggs.jpg";
import engine from "../../images/engine.JPG";
import engine2 from "../../images/engine2.JPG";
import vitalGrower from "../../images/vitalGrower.JPG";
import topFinisher from "../../images/topFinisher.JPG";
import topStarter from "../../images/topStarter.JPG";
import topLayers from "../../images/topLayers.JPG";

const Home = () => {
  return (
    <section>
      <div className={classes.home}>
        <h1>Our Story</h1>
        <p>
          Farmbelt is family-owned and operated farm, growing high quality palm
          produce, fruits and vegetables, fishes, birds and sales of animal
          feeds, located in the town of Ihe-Achi in Oji-river L.G.A Enugu state.
          We are craftsmen and cultivators of the land, creating a place we call
          home, and sharing our journey with others.
        </p>
      </div>
      <div className={classes.container}>
        <h2>Gallery</h2>
        <div className={classes.gallery}>
          <div className={classes.img}>
            <img src={chickens} alt="chickens" />
          </div>
          <div className={classes.img}>
            <img src={layers} alt="chickens" />
          </div>
          <div className={classes.img}>
            <img src={egg} alt="eggs" />
          </div>
          <div className={classes.img}>
            <img src={turkeys} alt="turkeys" />
          </div>
          <div className={classes.img}>
            <img src={palmTrees} alt="palm trees" />
          </div>
          <div className={classes.img}>
            <img src={palmTreez} alt="palm trees" />
          </div>
          <div className={classes.img}>
            <img src={palmFruit} alt="palm fruit" />
          </div>
          <div className={classes.img}>
            <img src={engine} alt="equipment" />
          </div>
          <div className={classes.img}>
            <img src={engine2} alt="equipment" />
          </div>
          <div className={classes.img}>
            <img src={papaya} alt="papaya" />
          </div>
          <div className={classes.img}>
            <img src={topStarter} alt="top starter" />
          </div>
          <div className={classes.img}>
            <img src={topLayers} alt="top layers" />
          </div>
          <div className={classes.img}>
            <img src={topFinisher} alt="top finisher" />
          </div>
          <div className={classes.img}>
            <img src={vitalGrower} alt="vital grower" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
