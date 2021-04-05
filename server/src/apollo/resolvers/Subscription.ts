import type { TContext } from "../types/context";
import type { SubscriptionResolvers } from "../types/generated";

const Subscription: SubscriptionResolvers<TContext> = {
  newRow: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("ROW_ADDED")
  },
  editedRow: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("ROW_EDITED")
  },
  deletedRow: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("ROW_DELETED")
  },
  toggleDisableTable: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("TOGGLE")
  }
};

export default Subscription;
