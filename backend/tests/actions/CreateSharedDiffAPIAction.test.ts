import { CreateSharedDiffAPIAction } from '../../src/actions/CreateSharedDiffAPIAction';
import { SharedDiffRepository } from '../../src/sharedDiffRepository/SharedDiffRepository';
import { SharedDiff } from 'diffy-models';

import { metrics } from '../MockedMetrics';

test('should create a CreateSharedDiffAction, create the SharedDiff and store it', () => {
  const raw_diff = `
diff --git a/file.json b/file.json
index 1456e89..e1da2da 100644
--- a/file.json
+++ b/file.json
@@ -1,1 +1,1 @@
-a
+b
`
  const repo: SharedDiffRepository = {
    // insert: (diff: SharedDiff) => ({ id:
    // '1', ...diff }),
    insert: jest.fn(diff => Promise.resolve(diff)),
    fetchById: (id: string) => null,
    deleteById: (id: string) => Promise.resolve(0),
    update: (diff: SharedDiff) => Promise.reject('random err'),
    deleteExpired: jest.fn(),
  };
  const action = new CreateSharedDiffAPIAction(repo, metrics);
  expect(action).toBeDefined();
  const shared_diff = action.createSharedDiff(raw_diff);
  expect(shared_diff.diff).toBeDefined();
  return action.storeSharedDiff(shared_diff).then(() => {
    expect(repo.insert).toHaveBeenCalled();
    expect(metrics.diffStoredSuccessfullyFromAPI).toHaveBeenCalled();
  });
});

test('CreateSharedDiffAction.storeSharedDiff(), store fails when inserting', () => {
  const raw_diff = `
diff --git a/file.json b/file.json
index 1456e89..e1da2da 100644
--- a/file.json
+++ b/file.json
@@ -1,1 +1,1 @@
-a
+b
`
  const repo: SharedDiffRepository = {
    // insert: (diff: SharedDiff) => ({ id:
    // '1', ...diff }),
    insert: jest.fn((diff) => Promise.reject('fake error')),
    fetchById: (id: string) => null,
    deleteById: (id: string) => Promise.resolve(0),
    update: (diff: SharedDiff) => Promise.resolve(diff),
    deleteExpired: jest.fn(),
  };
  const action = new CreateSharedDiffAPIAction(repo, metrics);
  expect(action).toBeDefined();
  const shared_diff = action.createSharedDiff(raw_diff);
  expect(shared_diff.diff).toBeDefined();
  return action.storeSharedDiff(shared_diff)
    .then(() => fail('should never reach'))
    .catch(() => {
      expect(repo.insert).toHaveBeenCalled();
      expect(metrics.diffFailedToStoreFromAPI).toHaveBeenCalled();
    });
});