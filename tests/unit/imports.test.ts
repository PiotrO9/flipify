import { expect } from 'vitest';

describe('import vue components', () => {
    test('normal imports as expected', async () => {
        const cmp = await import('../../components/Base/BaseButton.vue');

        expect(cmp).toBeDefined();
    });
});
