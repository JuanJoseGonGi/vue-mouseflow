import { inject } from 'vue';

export const VueMouseflowSymbol = Symbol();

export function useToasted() {
  const VueMouseflow = inject(VueMouseflowSymbol);
  if (!VueMouseflow) throw new Error('No VueMouseflow provided!!!');

  return VueMouseflow;
}
