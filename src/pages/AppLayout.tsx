import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import classes from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={classes.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
