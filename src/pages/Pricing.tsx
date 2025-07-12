// Uses the same styles as Product
import PageNav from '../components/PageNav';
import classes from './Product.module.css';

export default function Product() {
  return (
    <main className={classes.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Less than your Netflix subscription. Who watches Netflix when
            travelling anyway?
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
