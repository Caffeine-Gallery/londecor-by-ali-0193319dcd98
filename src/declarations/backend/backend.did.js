export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Project = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'imageUrl' : IDL.Text,
    'timestamp' : Time,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addProject' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'getProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'submitContact' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
