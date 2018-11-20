import assert from 'assert';
import {ListLayout, Rect, Size} from '@react/collection-view';
import loadingLayout from '../../src/utils/loadingLayout';

describe('loadingLayout', function () {
  it('should get an empty view if the table is empty', function () {
    let layout = loadingLayout(new ListLayout());
    layout.component = {};
    layout.collectionView = {size: new Size(100, 100), getNumberOfSections: () => 1, getSectionLength: () => 0};
    layout.validate();

    let layoutInfos = layout.getVisibleLayoutInfos(new Rect(0, 0, 100, 100));
    let emptyView = layoutInfos.find(l => l.type === 'empty-view');
    assert(emptyView);
    assert.deepEqual(emptyView.rect, new Rect(0, 0, 100, 100));

    emptyView = layout.getLayoutInfo('empty-view');
    assert(emptyView);
    assert.deepEqual(emptyView.rect, new Rect(0, 0, 100, 100));
  });

  it('should get a loading indicator if the table is loading and empty', function () {
    let layout = loadingLayout(new ListLayout());
    layout.component = {isLoading: true};
    layout.collectionView = {size: new Size(100, 100), getNumberOfSections: () => 1, getSectionLength: () => 0};
    layout.validate();

    let layoutInfos = layout.getVisibleLayoutInfos(new Rect(0, 0, 100, 100));
    let loadingIndicator = layoutInfos.find(l => l.type === 'loading-indicator');
    assert(loadingIndicator);
    assert.deepEqual(loadingIndicator.rect, new Rect(0, 0, 100, 100));

    loadingIndicator = layout.getLayoutInfo('loading-indicator');
    assert(loadingIndicator);
    assert.deepEqual(loadingIndicator.rect, new Rect(0, 0, 100, 100));
  });

  it('should get a loading indicator at the bottom if the table is loading more', function () {
    let layout = loadingLayout(new ListLayout());
    layout.component = {isLoading: true};
    layout.collectionView = {
      size: new Size(100, 100),
      getNumberOfSections: () => 1,
      getSectionLength: () => 100,
      delegate: {
        indentationForItem: () => 0
      }
    };
    layout.validate();

    let layoutInfos = layout.getVisibleLayoutInfos(new Rect(0, 0, 100, 100));
    let loadingIndicator = layoutInfos.find(l => l.type === 'loading-indicator');
    assert(loadingIndicator);
    assert.deepEqual(loadingIndicator.rect, new Rect(0, 48 * 100, 100, 100));

    loadingIndicator = layout.getLayoutInfo('loading-indicator');
    assert(loadingIndicator);
    assert.deepEqual(loadingIndicator.rect, new Rect(0, 48 * 100, 100, 100));

    assert.deepEqual(layout.getContentSize().height, 48 * 100 + 100);
  });
});
