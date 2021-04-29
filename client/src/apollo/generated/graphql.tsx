import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddRowInput = {
  tableID: Scalars['ID'];
  fullName?: Maybe<Scalars['String']>;
  data: Array<Scalars['String']>;
};

export type DeleteRowInput = {
  tableID: Scalars['ID'];
  rowID: Scalars['ID'];
};

export type Draft = {
  __typename?: 'Draft';
  title: Scalars['String'];
  target?: Maybe<Scalars['Int']>;
  deadline?: Maybe<Scalars['String']>;
  fields: Array<Field>;
};

export type DraftConnection = {
  __typename?: 'DraftConnection';
  node: Array<Draft>;
  hasMore: Scalars['Boolean'];
};

export enum EFields {
  ShortText = 'SHORT_TEXT',
  LongText = 'LONG_TEXT',
  Number = 'NUMBER',
  Boolean = 'BOOLEAN',
  SelectOne = 'SELECT_ONE',
  MultipleSelect = 'MULTIPLE_SELECT',
  Time = 'TIME',
  Date = 'DATE',
  TimeDate = 'TIME_DATE'
}

export type EditRowInput = {
  tableID: Scalars['ID'];
  rowID: Scalars['ID'];
  fullName?: Maybe<Scalars['String']>;
  data: Array<Scalars['String']>;
};

export type Field = {
  __typename?: 'Field';
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  type: Scalars['String'];
};

export type FieldInput = {
  name: Scalars['String'];
  type?: Maybe<EFields>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRow: Row;
  createTable: Table;
  deleteDraft: Scalars['String'];
  deleteRow: Row;
  deleteTable: Scalars['Boolean'];
  editRow: Row;
  login: Token;
  register: User;
  saveDraft: Scalars['String'];
  toggleDisableTable: Scalars['Boolean'];
  updateDraft?: Maybe<Scalars['String']>;
  updateUser: User;
};


export type MutationAddRowArgs = {
  args: AddRowInput;
};


export type MutationCreateTableArgs = {
  args: TableInput;
};


export type MutationDeleteDraftArgs = {
  key: Scalars['String'];
};


export type MutationDeleteRowArgs = {
  args: DeleteRowInput;
};


export type MutationDeleteTableArgs = {
  id: Scalars['ID'];
};


export type MutationEditRowArgs = {
  args: EditRowInput;
};


export type MutationLoginArgs = {
  args: LoginInput;
};


export type MutationRegisterArgs = {
  args: RegisterInput;
};


export type MutationSaveDraftArgs = {
  values: TableInput;
};


export type MutationToggleDisableTableArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateDraftArgs = {
  key: Scalars['String'];
  values: TableInput;
};


export type MutationUpdateUserArgs = {
  args: UpdateInput;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  draft: Draft;
  drafts: DraftConnection;
  table: Table;
  tables: TableConnection;
};


export type QueryDraftArgs = {
  key: Scalars['String'];
};


export type QueryDraftsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  filter?: Maybe<TableFilterInput>;
};


export type QueryTableArgs = {
  id: Scalars['ID'];
};


export type QueryTablesArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  filter?: Maybe<TableFilterInput>;
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  _id: Scalars['ID'];
  fullName: Scalars['String'];
  email: Scalars['String'];
};

export type Row = {
  __typename?: 'Row';
  _id?: Maybe<Scalars['ID']>;
  fullName?: Maybe<Scalars['String']>;
  data: Array<Scalars['String']>;
  date: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newRow: Row;
  editedRow: Row;
  deletedRow: Row;
  toggleDisableTable: Scalars['Boolean'];
};

export type Table = {
  __typename?: 'Table';
  _id: Scalars['ID'];
  title: Scalars['String'];
  target?: Maybe<Scalars['Int']>;
  deadline?: Maybe<Scalars['String']>;
  fields: Array<Field>;
  rows: Array<Row>;
  disabled: Scalars['Boolean'];
};

export type TableConnection = {
  __typename?: 'TableConnection';
  node: Array<Table>;
  hasMore: Scalars['Boolean'];
};

export type TableFilterInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type TableInput = {
  title: Scalars['String'];
  target?: Maybe<Scalars['Int']>;
  deadline?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  fields: Array<FieldInput>;
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UpdateInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  fullName: Scalars['String'];
  email: Scalars['String'];
};

export type GetDraftQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type GetDraftQuery = (
  { __typename?: 'Query' }
  & { draft: (
    { __typename?: 'Draft' }
    & Pick<Draft, 'title' | 'target' | 'deadline'>
    & { fields: Array<(
      { __typename?: 'Field' }
      & Pick<Field, '_id' | 'name' | 'type'>
    )> }
  ) }
);

export type GetDraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDraftsQuery = (
  { __typename?: 'Query' }
  & { drafts: (
    { __typename?: 'DraftConnection' }
    & { node: Array<(
      { __typename?: 'Draft' }
      & Pick<Draft, 'title' | 'target' | 'deadline'>
      & { fields: Array<(
        { __typename?: 'Field' }
        & Pick<Field, '_id' | 'name' | 'type'>
      )> }
    )> }
  ) }
);

export type SaveDraftMutationVariables = Exact<{
  values: TableInput;
}>;


export type SaveDraftMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveDraft'>
);


export const GetDraftDocument = gql`
    query GetDraft($key: String!) {
  draft(key: $key) @client {
    title
    target
    deadline
    fields {
      _id
      name
      type
    }
  }
}
    `;

/**
 * __useGetDraftQuery__
 *
 * To run a query within a React component, call `useGetDraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDraftQuery(baseOptions: Apollo.QueryHookOptions<GetDraftQuery, GetDraftQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDraftQuery, GetDraftQueryVariables>(GetDraftDocument, options);
      }
export function useGetDraftLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDraftQuery, GetDraftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDraftQuery, GetDraftQueryVariables>(GetDraftDocument, options);
        }
export type GetDraftQueryHookResult = ReturnType<typeof useGetDraftQuery>;
export type GetDraftLazyQueryHookResult = ReturnType<typeof useGetDraftLazyQuery>;
export type GetDraftQueryResult = Apollo.QueryResult<GetDraftQuery, GetDraftQueryVariables>;
export const GetDraftsDocument = gql`
    query GetDrafts {
  drafts @client {
    node {
      title
      target
      deadline
      fields {
        _id
        name
        type
      }
    }
  }
}
    `;

/**
 * __useGetDraftsQuery__
 *
 * To run a query within a React component, call `useGetDraftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDraftsQuery(baseOptions?: Apollo.QueryHookOptions<GetDraftsQuery, GetDraftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDraftsQuery, GetDraftsQueryVariables>(GetDraftsDocument, options);
      }
export function useGetDraftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDraftsQuery, GetDraftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDraftsQuery, GetDraftsQueryVariables>(GetDraftsDocument, options);
        }
export type GetDraftsQueryHookResult = ReturnType<typeof useGetDraftsQuery>;
export type GetDraftsLazyQueryHookResult = ReturnType<typeof useGetDraftsLazyQuery>;
export type GetDraftsQueryResult = Apollo.QueryResult<GetDraftsQuery, GetDraftsQueryVariables>;
export const SaveDraftDocument = gql`
    mutation SaveDraft($values: TableInput!) {
  saveDraft(values: $values) @client
}
    `;
export type SaveDraftMutationFn = Apollo.MutationFunction<SaveDraftMutation, SaveDraftMutationVariables>;

/**
 * __useSaveDraftMutation__
 *
 * To run a mutation, you first call `useSaveDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveDraftMutation, { data, loading, error }] = useSaveDraftMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useSaveDraftMutation(baseOptions?: Apollo.MutationHookOptions<SaveDraftMutation, SaveDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveDraftMutation, SaveDraftMutationVariables>(SaveDraftDocument, options);
      }
export type SaveDraftMutationHookResult = ReturnType<typeof useSaveDraftMutation>;
export type SaveDraftMutationResult = Apollo.MutationResult<SaveDraftMutation>;
export type SaveDraftMutationOptions = Apollo.BaseMutationOptions<SaveDraftMutation, SaveDraftMutationVariables>;
export type DraftKeySpecifier = ('title' | 'target' | 'deadline' | 'fields' | DraftKeySpecifier)[];
export type DraftFieldPolicy = {
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	deadline?: FieldPolicy<any> | FieldReadFunction<any>,
	fields?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DraftConnectionKeySpecifier = ('node' | 'hasMore' | DraftConnectionKeySpecifier)[];
export type DraftConnectionFieldPolicy = {
	node?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FieldKeySpecifier = ('_id' | 'name' | 'type' | FieldKeySpecifier)[];
export type FieldFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addRow' | 'createTable' | 'deleteDraft' | 'deleteRow' | 'deleteTable' | 'editRow' | 'login' | 'register' | 'saveDraft' | 'toggleDisableTable' | 'updateDraft' | 'updateUser' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addRow?: FieldPolicy<any> | FieldReadFunction<any>,
	createTable?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteDraft?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteRow?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteTable?: FieldPolicy<any> | FieldReadFunction<any>,
	editRow?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	saveDraft?: FieldPolicy<any> | FieldReadFunction<any>,
	toggleDisableTable?: FieldPolicy<any> | FieldReadFunction<any>,
	updateDraft?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('currentUser' | 'draft' | 'drafts' | 'table' | 'tables' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	currentUser?: FieldPolicy<any> | FieldReadFunction<any>,
	draft?: FieldPolicy<any> | FieldReadFunction<any>,
	drafts?: FieldPolicy<any> | FieldReadFunction<any>,
	table?: FieldPolicy<any> | FieldReadFunction<any>,
	tables?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RegisterResultKeySpecifier = ('_id' | 'fullName' | 'email' | RegisterResultKeySpecifier)[];
export type RegisterResultFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fullName?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RowKeySpecifier = ('_id' | 'fullName' | 'data' | 'date' | RowKeySpecifier)[];
export type RowFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fullName?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('newRow' | 'editedRow' | 'deletedRow' | 'toggleDisableTable' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	newRow?: FieldPolicy<any> | FieldReadFunction<any>,
	editedRow?: FieldPolicy<any> | FieldReadFunction<any>,
	deletedRow?: FieldPolicy<any> | FieldReadFunction<any>,
	toggleDisableTable?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TableKeySpecifier = ('_id' | 'title' | 'target' | 'deadline' | 'fields' | 'rows' | 'disabled' | TableKeySpecifier)[];
export type TableFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	deadline?: FieldPolicy<any> | FieldReadFunction<any>,
	fields?: FieldPolicy<any> | FieldReadFunction<any>,
	rows?: FieldPolicy<any> | FieldReadFunction<any>,
	disabled?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TableConnectionKeySpecifier = ('node' | 'hasMore' | TableConnectionKeySpecifier)[];
export type TableConnectionFieldPolicy = {
	node?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenKeySpecifier = ('accessToken' | 'refreshToken' | TokenKeySpecifier)[];
export type TokenFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('_id' | 'fullName' | 'email' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fullName?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Draft?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DraftKeySpecifier | (() => undefined | DraftKeySpecifier),
		fields?: DraftFieldPolicy,
	},
	DraftConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DraftConnectionKeySpecifier | (() => undefined | DraftConnectionKeySpecifier),
		fields?: DraftConnectionFieldPolicy,
	},
	Field?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FieldKeySpecifier | (() => undefined | FieldKeySpecifier),
		fields?: FieldFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RegisterResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RegisterResultKeySpecifier | (() => undefined | RegisterResultKeySpecifier),
		fields?: RegisterResultFieldPolicy,
	},
	Row?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RowKeySpecifier | (() => undefined | RowKeySpecifier),
		fields?: RowFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	Table?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TableKeySpecifier | (() => undefined | TableKeySpecifier),
		fields?: TableFieldPolicy,
	},
	TableConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TableConnectionKeySpecifier | (() => undefined | TableConnectionKeySpecifier),
		fields?: TableConnectionFieldPolicy,
	},
	Token?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenKeySpecifier | (() => undefined | TokenKeySpecifier),
		fields?: TokenFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};