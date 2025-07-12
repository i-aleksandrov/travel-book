import PageNav from '../components/PageNav';
import classes from './Product.module.css';

export default function Product() {
  return (
    <main className={classes.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About TravelBook.</h2>
          <p>
            Keep track of your travels and take notes. Come back any time to
            relive your memories.
          </p>
        </div>
      </section>
    </main>
  );
}
