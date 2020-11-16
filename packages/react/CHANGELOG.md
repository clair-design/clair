# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.10.2] (2020-09-21)


### Bug Fixes

* **react:** add missing class for empty tr ([4e10c8a])
* **react:** trigger `onClick` on DropdownMenu correctly ([20f7402])
* **react:** update shadow render logic ([72bd9d0])





## [1.10.1] (2020-08-26)


### Bug Fixes

* **react:** add missing prepublish script ([40a1199])





# [1.10.0] (2020-08-26)


### Bug Fixes

* **react:** use \`<div/>\` as description's container ([1823a01])
* **react:** use lodash-es instead of lodash ([e657f7c])


### Features

* **react:** add ghost type to button ([1acb20c])
* **sites:** support open in codesandbox ([cc9a52d])





# [1.9.0] (2020-08-25)


### Bug Fixes

* **react:** add missing key ([bbe89db])
* **react:** pass \`value\` to onChange call ([483c9e9])
* **react:** remove extra offset of option panel ([09c2a5f])
* 修复 render 参数的设计问题。 ([d0ab301])
* 修复因传递了onSelectAll导致表单受控的问题 ([4f2467d])
* 修复因默认值可能导致永远受控的问题 ([4526433])
* 修复非受控模式下无法调用onSelectAll的问题 ([ab27ce0])


### Features

* **react:** add \`checked\` props to radio ([918859b])
* **react:** add animation to tooltip ([a2e90a4])
* **react:** add dropdown component ([f32512b]), closes [#64]
* **react:** add form component ([25e42f8]), closes [#106]
* **react:** change api of `onVisibilityChange` ([6476e90])
* **sites:** add essentials to react site ([d47750d])
* add table@react component ([173fecf])
* add table@react component ([30d6ca4])
* add table@react component ([8075260])





# [1.8.0] (2020-07-16)


### Features

* **react:** add inputNumber ([836b309])
* **react:** add menu component ([766c99e])
* **react:** add select component ([c7defd6]), closes [#17]





## [1.7.1] (2020-06-25)

**Note:** Version bump only for package @clair/react





# [1.7.0] (2020-06-23)


### Bug Fixes

* **react:** fix typo ([b9414e4])
* **react:** keep tabpane content in page with \`lazy\` config ([e40f461])
* **react:** tweak type denotation that block build ([1deac76])
* **react:** unify event handler ([3f2fb7f])


### Features

* **react:** add DatePicker and RangePicker component ([4c13f5b]), closes [#147]
* **react:** add tabs component ([9f41a69])
* **react:** add Tabs component ([f01a6fe])





## [1.6.1] (2020-05-21)


### Bug Fixes

* **react:** avoid updating \`strokeWidth\` of icon unnecessarily ([91248f9])
* **react:** improve ssr handling of tooltip ([27ad93e])





# [1.6.0] (2020-04-30)


### Bug Fixes

* **react:** only throw error if the content of tooltip is nullish ([b0a59a3])


### Features

* add progress component ([dd88ca4]), closes [#141]
* **react:** add slider component ([b51e80a])
* merge ([d96418e])
* **react:** add steps component ([7ca3188])





# [1.5.0] (2020-04-16)


### Bug Fixes

* **react:** set \`stroke-width\` to 1 for status icons ([b367d33])
* hide modal as soon as mousedown is triggered on mask ([35c3f2b])


### Features

* **react:** add \`appendTarget\` props to tooltip ([4df2055])





# [1.4.0] (2020-04-09)


### Bug Fixes

* **react:** adopt new API of \`modalService\` from @clair/helpers ([ee56720])
* **react:** avoid unneeded calling to onVisibilityChange ([9c21b33])


### Features

* **react:** add Descriptions ([ac6d10d]), closes [#144]
* **react:** add pagination ([2baf0ed]), closes [#41]
* **react:** refocus on the previously focused element after modal exit ([5b3257a])





# [1.3.0] (2020-03-26)


### Features

* **react:** add timeline component ([4cabada])





# [1.2.0] (2020-03-05)


### Features

* **react:** add layout component ([a7bc127]), closes [#140]





## [1.1.1] (2020-02-20)


### Bug Fixes

* **react:** update default className of TooltipCore ([b133bf4])





# [1.1.0] (2020-02-06)


### Bug Fixes

* **react:** do not consider transform when place tooltip ([7d4b688])
* **react:** update when to trigger \`onActiveChange\` ([c96c478])


### Features

* **react:** add \`visible\` prop to Tag component ([22eaf61])
* **react:** add rating component ([075d653])





## [1.0.1] (2020-01-09)


### Bug Fixes

* **react:** update modal's structure ([dbed58f])





# 1.0.0 (2019-12-26)


### Bug Fixes

* **react:** add className and style to props ([706dca1])
* **react:** add missing deps ([e9c6568])
* **react:** add missing deps and update dpes ([3c0e08e])
* **react:** add missing import ([3767fb4])
* **react:** allow to select tooltip's content when triggered by focus ([df7c48c])
* **react:** apply given className properly instead of overriding ([76d702c])
* **react:** change popconfirm's role from 'popconfirm' to 'dialog' ([3e9233e])
* **react:** copy proper tsconfig.json to dist ([4dd7a2a])
* **react:** disable eslint autofix for icon effects ([6903e18])
* **react:** drop secondPlacementKey when it is undefined ([0de8ba1])
* **react:** execute \`onVisibilityChange\` under all circumstances ([d7faa29])
* **react:** export .d.ts with relative import path ([cb2fe99])
* **react:** export Message properly ([3886065])
* **react:** fix Alert detail ([9899c23])
* **react:** fix bug of light modal style disorde ([e134f5a])
* **react:** fix build errors ([b730169])
* **react:** fix caps reference within Modal examples ([b31fdd9])
* **react:** fix close modal bug ([e96cacf])
* **react:** fix close modal bug ([2787369])
* **react:** fix infinite loop of useEffect within message component ([be18131])
* **react:** fix potential ui update issue ([c7e564c])
* **react:** fix test config ([8c3a0fd])
* **react:** free memory after PopConfirm unmount ([cf7ac62])
* **react:** make tooltip respond to resize properly ([dfd1014])
* **react:** move packages from devDependencies to dependencies ([0ecda7f])
* **react:** provide proper alias ([45166fd])
* **react:** re-position tooltip-ish component better ([7c22260])
* **react:** remove aria-hidden from icon ([42a699e])
* **react:** remove extra async ([dd9761b])
* **react:** remove incorrect alias ([5b0ba0d])
* **react:** remove keyup handler on button ([2186fda])
* **react:** remove loader that no longer in use ([c0ae97b])
* **react:** remove style related code ([f0bcda5])
* **react:** remove useage of stylelint from site build flow ([273d8b8])
* **react:** sepecify event type on Button ([3b15459])
* **react:** set initial position to (-1, -1) ([a347d22])
* **react:** set xxl boundry to 2560px ([b150b55])
* **react:** update .gitignore ([0805858])
* **react:** update how to update strokeWidth ([6daf0d6])
* **react:** use css to control gap between tooltip and target ([fc05a52])
* **vue:** do not emit `change` when the value is the same ([683399a])
* merge master ([d45a276])
* wrong success icon ([f8933b3])
* **react:** useSwitchEffect after side effects actually took in place ([b149965])


### Code Refactoring

* **react:** polish modal ([8504068])
* **react:** refine hooks ([0531150])
* **react:** unify hooks API ([2c90574])


### Features

* **react:** add \`filledOnly\` props for icon ([f7bab98])
* **react:** add a transition of showing for tooltip ([64d7209])
* **react:** add Alert component and modified statusIcon ([2d0019a])
* **react:** add avatar component ([b830907])
* **react:** add badge component ([3691447]), closes [#67]
* **react:** add checkbox component ([dab8981]), closes [#32]
* **react:** add createError utility function ([0e00bd8])
* **react:** add Empty component ([25fa222]), closes [#104]
* **react:** add focus button ([b682f85])
* **react:** add Grid component ([5587892])
* **react:** add icon components ([414c0cf])
* **react:** add input component ([19719d7]), closes [#78]
* **react:** add loading component ([f0b6a8d]), closes [#112]
* **react:** add message component ([578e7ed])
* **react:** add more icons ([91d17e2])
* **react:** add new icons ([b84c2b8])
* **react:** add new icons ([c37fcfa])
* **react:** add new icons ([6516b5f])
* **react:** add optional detail field to event interface ([b7a6c95])
* **react:** add sourceType for cancel action ([90dbd93])
* **react:** add switch component ([b2d01d1]), closes [#94]
* **react:** add switch component ([d3095f2]), closes [#58]
* **react:** add tab event & test case ([6c30438])
* **react:** add tag component ([4ae179a])
* **react:** add upload component ([fb1a864]), closes [#34]
* **react:** alert using children instead of content now ([24e49b3]), closes [#8]
* **react:** basic icons ([366840b])
* **react:** button respond to enter the same way as to click ([7dd45d8])
* **react:** fix alert detail ([73bc0be])
* **react:** handle tab events ([df772e8])
* **react:** popconfirm ([5ed920e])
* **react:** radio component ([bba27f3])
* **react:** tooltip ([1856176]), closes [#2]
* **react:** update focus management of popconfirm ([73cd1f5])
* **react:** update tooltip's default trigger ([663da67])
* **vue:** add datepicker component ([f66f1e4])
* **vue:** add timeline component ([6bb4d9a])
* add breadcrumb component ([82b5f79])
* add notification component ([95c090b])
* **react:** tooltip will fade out when click other part of the page ([f5ed514])
* **react:** update test cases ([ee3e836])
* **react:** z-index management for tooltip ([cf1b837])
* **sites:** initiate sites ([9f6b730])
* add icon for question mark ([407359a])
* add modal component ([fc961e8])


### Performance Improvements

* **react:** improve performance of Tooltip and PopConfirm ([c8a8a0b])


### BREAKING CHANGES

* **react:** Update event signature of \`onVisibilityChange\` for both tooltip and popconfirm
* **react:** API change of useFindDOMEffecct
* **react:** rename customeClass to className
* **react:** useFocusEffect -> useFocusRef
