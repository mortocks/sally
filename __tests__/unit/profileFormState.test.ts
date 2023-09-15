import { expect, test, describe, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import '@testing-library/jest-dom/vitest';

import useProfileForm from '../../src/forms/profile';

describe('Profile form state', () => {
    test('Hook should accept default values', () => {

        const { result } = renderHook(() => useProfileForm({
            defaultValues: {
                firstName: 'Sally',
                lastName: 'Smith',
                email: 'test@email.com',
                role: 'admin',
                isActive: true
            }
        }));

        expect(result.current.getValues()).toMatchObject({
            firstName: 'Sally',
            lastName: 'Smith',
            email: 'test@email.com',
            role: 'admin',
            isActive: true
        });
    })

    test('Profile should require a first name', async () => {

        const { result, waitForNextUpdate } = renderHook(() => useProfileForm());

        act(() => {
            result.current.trigger('firstName')
        })
        await waitForNextUpdate();

        expect(result.current.formState.errors).toMatchObject({
            firstName: '',
        });
    })
})



afterEach(() => {
    cleanup();
});