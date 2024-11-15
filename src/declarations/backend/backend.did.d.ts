import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Project {
  'id' : string,
  'title' : string,
  'description' : string,
  'imageUrl' : string,
  'timestamp' : Time,
  'category' : string,
}
export type Time = bigint;
export interface _SERVICE {
  'addProject' : ActorMethod<[string, string, string, string], string>,
  'getProjects' : ActorMethod<[], Array<Project>>,
  'submitContact' : ActorMethod<[string, string, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
