export type CarDestination =
  | {
      label: string;
      icon: string;
      url: string;
    }
  | {
      label: string;
      icon: string;
      children: CarDestination[];
    };
