export interface PropertyOptions {
  allowNull?: boolean;
  type: (new (value: any) => any) | ((value: any) => any);
}

const MODEL_PROPS = Symbol('props');

export function Prop(options: PropertyOptions): (target: any, key: string | symbol) => any {
  return (target: any, key: string | symbol) => {
    if (!target.constructor[MODEL_PROPS]) target.constructor[MODEL_PROPS] = {};
    target.constructor[MODEL_PROPS][key] = { allowNull: true, ...(options || {}) };
  };
}

Prop.$props = MODEL_PROPS;
