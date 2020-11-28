import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  showUser?: Maybe<User>;
  listAllPublicRooms: Array<Room>;
  listAllUserRooms: Array<Room>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  nickname: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};


export type Room = {
  __typename?: 'Room';
  id: Scalars['ID'];
  owner_id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: User;
  authenticateUser: User;
  logout: Scalars['Boolean'];
  changeUserStatus: User;
  createRoom: Room;
  joinPublicRoom: Room;
  joinPrivateRoom: Scalars['Boolean'];
  generateInvitePrivateRoom: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  nickname: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAuthenticateUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  type: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationJoinPublicRoomArgs = {
  room_id: Scalars['String'];
};


export type MutationJoinPrivateRoomArgs = {
  token: Scalars['String'];
};


export type MutationGenerateInvitePrivateRoomArgs = {
  room_id: Scalars['String'];
};

export type AuthenticateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateUserMutation = (
  { __typename?: 'Mutation' }
  & { authenticateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'nickname' | 'email' | 'avatar' | 'status' | 'created_at' | 'updated_at'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'nickname' | 'email' | 'avatar' | 'status' | 'created_at' | 'updated_at'>
  ) }
);

export type ShowUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowUserQuery = (
  { __typename?: 'Query' }
  & { showUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'nickname' | 'email' | 'avatar' | 'status' | 'created_at' | 'updated_at'>
  )> }
);


export const AuthenticateUserDocument = gql`
    mutation AuthenticateUser($email: String!, $password: String!) {
  authenticateUser(email: $email, password: $password) {
    id
    name
    nickname
    email
    avatar
    status
    created_at
    updated_at
  }
}
    `;

export function useAuthenticateUserMutation() {
  return Urql.useMutation<AuthenticateUserMutation, AuthenticateUserMutationVariables>(AuthenticateUserDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $nickname: String!, $password: String!) {
  registerUser(
    name: $name
    nickname: $nickname
    email: $email
    password: $password
  ) {
    id
    name
    nickname
    email
    avatar
    status
    created_at
    updated_at
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ShowUserDocument = gql`
    query ShowUser {
  showUser {
    id
    name
    nickname
    email
    avatar
    status
    created_at
    updated_at
  }
}
    `;

export function useShowUserQuery(options: Omit<Urql.UseQueryArgs<ShowUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ShowUserQuery>({ query: ShowUserDocument, ...options });
};