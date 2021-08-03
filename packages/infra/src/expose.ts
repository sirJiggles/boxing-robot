import * as pulumi from '@pulumi/pulumi';

// something someone else can import to work with the stacks this program makes
export const getStack = (stack: string) => {
  return new pulumi.StackReference(`sirJiggles/boxing-robot/${stack}`);
};
