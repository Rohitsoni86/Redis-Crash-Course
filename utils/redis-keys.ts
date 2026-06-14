export const getKeyName = (...args: string[]) => `swiggy:${args.join(':')}`

export const restaurantKeyById = (id: string) => getKeyName("restaurants", id);

export const restaurantSet = () => getKeyName("restaurants", "set");

export const restaurantReviewSortedSet = () => getKeyName("restaurants", "reviews", "sorted-set");