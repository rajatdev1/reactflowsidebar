import Task from './task/component';
import taskIcon from './task/icon';
import Event from './event/component';
import eventIcon from './event/icon';
import diamondIcon from './diamond/icon';
import DiamondComponent from './diamond/component';
const config = {
  entityTypes: {
    Task: {
      width: 195,
      height: 105,
    },
    Event: {
      width: 150,
      height: 150,
    },
    Diamond: { // Add configuration for Diamond
      width: 200,
      height: 200,
    },
  },
  gridSize: 25,
};

const customEntities = {
  Task: {
    component: Task,
    icon: taskIcon,
  },
  Event: {
    component: Event,
    icon: eventIcon,
  },
  Diamond: { // Add Diamond to custom entities
    component: DiamondComponent,
    icon: diamondIcon,
  },
};

export { config, customEntities };
