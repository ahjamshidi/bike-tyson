import bikes from './trees.json';

export type Bike = {
  key: string;
  name: string;
  category: string;
  position: google.maps.LatLngLiteral;
};


for (let i = 0; i < bikes.length; i++) {
  (bikes[i] as Bike).key = `tree-${i}`;
}

/**
 * Simulates async loading of the dataset from an external source.
 * (data is inlined for simplicity in our build process)
 */
export async function loadBikeDataset(): Promise<Bike[]> {
  // simulate loading the bikes from an external source
  return new Promise(resolve => {
    setTimeout(() => resolve(bikes as Bike[]), 500);
  });
}

export default bikes as Bike[];