import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:external_app_launcher/external_app_launcher.dart';
import '/ui/navigator.dart';
import '/ui/screens/search_screen_controller.dart';

class SearchScreen extends StatelessWidget {
  const SearchScreen({Key? key}) : super(key: key);

  // Function to launch Shazam
  void launchShazamApp() async {
    var openAppResult = await LaunchApp.openApp(
      androidPackageName: 'com.shazam.android',
      iosUrlScheme: 'shazam://',
      // You can add the Shazam app link for the App Store here if needed
    );
    print('openAppResult => $openAppResult ${openAppResult.runtimeType}');
  }


  @override
  Widget build(BuildContext context) {
    final searchScreenController = Get.put(SearchScreenController());
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Stack( // Use a Stack to overlay the IconButton
        children: [
          Column(
            children: [
              Container(
                width: 60,
                color: Theme.of(context).navigationRailTheme.backgroundColor,
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 80),
                      child: IconButton(
                        icon: Icon(
                          Icons.arrow_back_ios_new_rounded,
                          color: Theme.of(context).textTheme.titleMedium!.color,
                        ),
                        onPressed: () {
                          Get.nestedKey(ScreenNavigationSetup.id)!
                              .currentState!
                              .pop();
                        },
                      ),
                    ),
                    
                  ],
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(top: 90, left: 5),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6), // Adjust the values as needed
                    child: GlowingOverscrollIndicator(
                      axisDirection: AxisDirection.down, // Add a glow effect when scrolling
                      color: Colors.blue, // Adjust the color as needed
                      child: Column(
                        children: [
                          Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              "search".tr,
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          TextField(
                            textCapitalization: TextCapitalization.sentences,
                            controller: searchScreenController.textInputController,
                            textInputAction: TextInputAction.search,
                            onChanged: searchScreenController.onChanged,
                            onSubmitted: (val) {
                              Get.toNamed(ScreenNavigationSetup.searchResultScreen,
                                  id: ScreenNavigationSetup.id, arguments: val);
                            },
                            autofocus: true,
                            cursorColor: Theme.of(context).textTheme.bodySmall!.color,
                            decoration: InputDecoration(
                              contentPadding: const EdgeInsets.only(left: 5),
                              focusColor: Colors.white,
                              hintText: "searchDes".tr,
                            ),
                          ),
                          Expanded(
                            child: Obx(() => ListView.builder(
                              padding: const EdgeInsets.only(top: 5),
                              physics: const BouncingScrollPhysics(
                                  parent: AlwaysScrollableScrollPhysics()),
                              itemCount: searchScreenController.suggestionList.length,
                              itemBuilder: (context, index) => ListTile(
                                contentPadding:
                                    const EdgeInsets.only(left: 10, right: 20),
                                onTap: () {
                                  Get.toNamed(
                                      ScreenNavigationSetup.searchResultScreen,
                                      id: ScreenNavigationSetup.id,
                                      arguments: searchScreenController
                                          .suggestionList[index]);
                                },
                                title: Text(searchScreenController.suggestionList[index]),
                                trailing: InkWell(
                                  onTap: () {
                                    searchScreenController.suggestionInput(
                                        searchScreenController.suggestionList[index]);
                                  },
                                  child: Icon(
                                    Icons.north_west_rounded,
                                    color: Theme.of(context)
                                        .textTheme
                                        .titleMedium!
                                        .color,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          ),],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
          Positioned( // Position the IconButton in the bottom-right corner
            top: 50,
            bottom: 50,
            right: 40,
            child: ClipRect( // Clip to apply blur
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
                child: IconButton(
                  icon: Icon(
                    Icons.music_note, // Use a suitable Shazam icon or replace it with the correct one.
                    color: Theme.of(context).textTheme.titleMedium!.color,
                  ),
                  iconSize: 56, // Set the size of the icon here.
                  onPressed: () {
                    // Launch Shazam when the icon is pressed
                    launchShazamApp();
                  },
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
