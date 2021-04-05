import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  List: any;
};









export type Query = {
  __typename?: 'Query';
  currentUser: User;
  table: Table;
  tables: TableConnection;
};


export type QueryTableArgs = {
  id: Scalars['ID'];
};


export type QueryTablesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  filter?: Maybe<TableFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Token;
  register: User;
  updateUser: User;
  createTable: Table;
  deleteTable: Scalars['Boolean'];
  addRow: Row;
  editRow: Row;
  deleteRow: Row;
  toggleDisableTable: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  args: LoginInput;
};


export type MutationRegisterArgs = {
  args: RegisterInput;
};


export type MutationUpdateUserArgs = {
  args: UpdateInput;
};


export type MutationCreateTableArgs = {
  args: TableInput;
};


export type MutationDeleteTableArgs = {
  id: Scalars['ID'];
};


export type MutationAddRowArgs = {
  args: AddRowInput;
};


export type MutationEditRowArgs = {
  args: EditRowInput;
};


export type MutationDeleteRowArgs = {
  args: DeleteRowInput;
};


export type MutationToggleDisableTableArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newRow: Row;
  editedRow: Row;
  deletedRow: Row;
  toggleDisableTable: Scalars['Boolean'];
};

export type TableFilterInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type TableInput = {
  title: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  deadline?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  fields: Array<FieldInput>;
};

export type AddRowInput = {
  tableID: Scalars['ID'];
  fullName?: Maybe<Scalars['String']>;
  data: Array<Scalars['String']>;
};

export type EditRowInput = {
  tableID: Scalars['ID'];
  rowID: Scalars['ID'];
  fullName?: Maybe<Scalars['String']>;
  data: Array<Scalars['String']>;
};

export type DeleteRowInput = {
  tableID: Scalars['ID'];
  rowID: Scalars['ID'];
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type FieldInput = {
  name: Scalars['String'];
  type?: Maybe<EFields>;
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  _id: Scalars['ID'];
  fullName: Scalars['String'];
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  fullName: Scalars['String'];
  email: Scalars['String'];
};

export type Table = {
  __typename?: 'Table';
  _id: Scalars['ID'];
  title: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  deadline?: Maybe<Scalars['String']>;
  fields: Array<Field>;
  rows: Array<Row>;
  disabled: Scalars['Boolean'];
};

export type Field = {
  __typename?: 'Field';
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Row = {
  __typename?: 'Row';
  _id?: Maybe<Scalars['ID']>;
  fullName?: Maybe<Scalars['String']>;
  data: Array<Scalars['String']>;
};


export type TableConnection = {
  __typename?: 'TableConnection';
  node: Array<Table>;
  hasMore: Scalars['Boolean'];
  cursor: Scalars['ID'];
};

export enum EFields {
  Text = 'TEXT',
  LongText = 'LONG_TEXT',
  Number = 'NUMBER',
  Boolean = 'BOOLEAN',
  SingleChoice = 'SINGLE_CHOICE',
  MultipleSelect = 'MULTIPLE_SELECT'
}

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Subscription: ResolverTypeWrapper<{}>;
  TableFilterInput: TableFilterInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  LoginInput: LoginInput;
  RegisterInput: RegisterInput;
  UpdateInput: UpdateInput;
  TableInput: TableInput;
  AddRowInput: AddRowInput;
  EditRowInput: EditRowInput;
  DeleteRowInput: DeleteRowInput;
  Token: ResolverTypeWrapper<Token>;
  FieldInput: FieldInput;
  RegisterResult: ResolverTypeWrapper<RegisterResult>;
  User: ResolverTypeWrapper<User>;
  Table: ResolverTypeWrapper<Table>;
  Field: ResolverTypeWrapper<Field>;
  Row: ResolverTypeWrapper<Row>;
  List: ResolverTypeWrapper<Scalars['List']>;
  TableConnection: ResolverTypeWrapper<TableConnection>;
  EFields: EFields;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Subscription: {};
  TableFilterInput: TableFilterInput;
  String: Scalars['String'];
  LoginInput: LoginInput;
  RegisterInput: RegisterInput;
  UpdateInput: UpdateInput;
  TableInput: TableInput;
  AddRowInput: AddRowInput;
  EditRowInput: EditRowInput;
  DeleteRowInput: DeleteRowInput;
  Token: Token;
  FieldInput: FieldInput;
  RegisterResult: RegisterResult;
  User: User;
  Table: Table;
  Field: Field;
  Row: Row;
  List: Scalars['List'];
  TableConnection: TableConnection;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  table?: Resolver<ResolversTypes['Table'], ParentType, ContextType, RequireFields<QueryTableArgs, 'id'>>;
  tables?: Resolver<ResolversTypes['TableConnection'], ParentType, ContextType, RequireFields<QueryTablesArgs, never>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'args'>>;
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'args'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'args'>>;
  createTable?: Resolver<ResolversTypes['Table'], ParentType, ContextType, RequireFields<MutationCreateTableArgs, 'args'>>;
  deleteTable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTableArgs, 'id'>>;
  addRow?: Resolver<ResolversTypes['Row'], ParentType, ContextType, RequireFields<MutationAddRowArgs, 'args'>>;
  editRow?: Resolver<ResolversTypes['Row'], ParentType, ContextType, RequireFields<MutationEditRowArgs, 'args'>>;
  deleteRow?: Resolver<ResolversTypes['Row'], ParentType, ContextType, RequireFields<MutationDeleteRowArgs, 'args'>>;
  toggleDisableTable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationToggleDisableTableArgs, 'id'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newRow?: SubscriptionResolver<ResolversTypes['Row'], "newRow", ParentType, ContextType>;
  editedRow?: SubscriptionResolver<ResolversTypes['Row'], "editedRow", ParentType, ContextType>;
  deletedRow?: SubscriptionResolver<ResolversTypes['Row'], "deletedRow", ParentType, ContextType>;
  toggleDisableTable?: SubscriptionResolver<ResolversTypes['Boolean'], "toggleDisableTable", ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterResult'] = ResolversParentTypes['RegisterResult']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Table'] = ResolversParentTypes['Table']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  deadline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['Field']>, ParentType, ContextType>;
  rows?: Resolver<Array<ResolversTypes['Row']>, ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['Field'] = ResolversParentTypes['Field']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RowResolvers<ContextType = any, ParentType extends ResolversParentTypes['Row'] = ResolversParentTypes['Row']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ListScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['List'], any> {
  name: 'List';
}

export type TableConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TableConnection'] = ResolversParentTypes['TableConnection']> = {
  node?: Resolver<Array<ResolversTypes['Table']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  RegisterResult?: RegisterResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Table?: TableResolvers<ContextType>;
  Field?: FieldResolvers<ContextType>;
  Row?: RowResolvers<ContextType>;
  List?: GraphQLScalarType;
  TableConnection?: TableConnectionResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';