export type CarDestinationLink = {
  label: string;
  icon: string;
  url: string;
};

export type CarDestinationGroup = {
  label: string;
  icon: string;
  children: CarDestination[];
};

export type CarDestination = CarDestinationLink | CarDestinationGroup;
